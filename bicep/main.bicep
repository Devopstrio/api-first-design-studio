// Devopstrio API-First Design Studio
// Master Infrastructure Orchestration Template

targetScope = 'subscription'

param location string = 'uksouth'
param prefix string = 'api-studio'
param env string = 'prd'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-${env}-platform'
  location: location
}

// 1. Core Network Spoke
module network './modules/network.bicep' = {
  scope: rg
  name: 'networkDeploy'
  params: {
    location: location
    vnetName: 'vnet-${prefix}-${env}'
  }
}

// 2. Azure API Management (Gateway)
module apim './modules/apim.bicep' = {
  scope: rg
  name: 'apimDeploy'
  params: {
    location: location
    apimName: 'apim-${prefix}-${env}'
    publisherEmail: 'platform@devopstrio.co.uk'
    publisherName: 'Devopstrio Platform Team'
    subnetId: network.outputs.apimSubnetId
  }
}

// 3. PostgreSQL Database (Metadata Store)
module data './modules/data.bicep' = {
  scope: rg
  name: 'dataDeploy'
  params: {
    location: location
    serverName: 'psql-${prefix}-${env}'
    subnetId: network.outputs.dbSubnetId
  }
}

// 4. Redis Cache (Mock Engine State & Latency Testing)
module redis './modules/redis.bicep' = {
  scope: rg
  name: 'redisDeploy'
  params: {
    location: location
    redisName: 'redis-${prefix}-${env}'
  }
}

output apimGatewayUrl string = apim.outputs.gatewayUrl
output apimDeveloperPortalUrl string = apim.outputs.developerPortalUrl
