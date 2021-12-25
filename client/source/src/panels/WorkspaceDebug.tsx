import React, { useEffect, useMemo } from 'react';

import { MAX_PEN_SIZE, MIN_PEN_SIZE } from 'constants/drawing';
import { useQueryParams } from 'hooks';
import { Line } from 'models';
import { MessageBus } from 'services';
import { Color } from 'stores';

import { Workspace } from './Workspace';

type Props = {
  backgroundColor: Color;
  inputBus: MessageBus<Line>;
  outputBus: MessageBus<Line>;
};

const WorkspaceDebug: React.FC<Props> = React.memo(({ backgroundColor, inputBus, outputBus }) => {
  const queryParams = useQueryParams();

  const penSize = useMemo((): number | undefined => {
    const size = queryParams.get('size');
    const parsedSize = parseInt(size ?? '', 10);

    return !isNaN(parsedSize) && parsedSize >= MIN_PEN_SIZE && parsedSize <= MAX_PEN_SIZE
      ? parsedSize
      : undefined;
  }, [queryParams]);

  const penColor = useMemo((): string | undefined => {
    const color = queryParams.get('color');
    return color !== null ? color : undefined;
  }, [queryParams]);

  useEffect(() => {
    const color = queryParams.get('bgcolor');
    if (color !== null) {
      backgroundColor.setValue(color);
    }
  }, [queryParams, backgroundColor]);

  return (
    <Workspace
      inputBus={inputBus}
      outputBus={outputBus}
      initialPenSize={penSize}
      initialPenColor={penColor}
      backgroundColor={backgroundColor}
    />
  );
});

export { WorkspaceDebug };
