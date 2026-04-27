import logging
import time
from typing import Dict

# Devopstrio API Studio
# Mock Engine - Dynamic Sandbox Servers

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - MOCK - %(message)s")
logger = logging.getLogger(__name__)

class DynamicMockServer:
    def __init__(self):
        self.active_mocks = {}
        logger.info("Initialized Dynamic Mock Router. Ready to bind schemas.")

    def deploy_sandbox(self, contract_id: str, base_path: str, schema_def: Dict) -> str:
        """
        In production, this would dynamically map Express/FastAPI routes in memory 
        using an engine like Prism or WireMock to serve fake payloads based on the OpenAPI schema objects.
        """
        logger.info(f"Deploying Sandbox for Contract [{contract_id}] on route [{base_path}]...")
        
        # Simulate router mounting
        time.sleep(1)
        mock_uri = f"https://mock.devopstrio.co.uk{base_path}"
        
        self.active_mocks[contract_id] = {
            "uri": mock_uri,
            "status": "Running",
            "traffic_count": 0
        }
        
        logger.info(f"✅ Mock Server LIVE at {mock_uri} (Latencies Simulated: True)")
        return mock_uri

    def simulate_request(self, contract_id: str, route: str):
        if contract_id not in self.active_mocks:
            logger.error("404: Mock Server Not Found")
            return
            
        logger.info(f"⬅️  Received mock request on {self.active_mocks[contract_id]['uri']}{route}")
        # Mocks typically generate synthetic data based on variable types (string -> Faker.name(), integer -> Random(1,100))
        logger.info(f"➡️  Returning 200 OK with dynamically synthesized JSON payload.")
        self.active_mocks[contract_id]["traffic_count"] += 1

def start_worker():
    engine = DynamicMockServer()
    # Simulate API Platform telling the Mock Engine to spin up a new endpoint
    mock_schema = {"type": "object", "properties": {"user": {"type": "string"}}}
    engine.deploy_sandbox("api-orders-v1", "/v1/orders/mock", mock_schema)
    
    # Simulate a frontend developer hitting the mock
    engine.simulate_request("api-orders-v1", "/1094")

if __name__ == "__main__":
    start_worker()
