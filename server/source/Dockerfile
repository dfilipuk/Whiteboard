FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder
WORKDIR /source
COPY . .
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 80
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "Whiteboard.Server.dll"]