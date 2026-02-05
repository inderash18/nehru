from .manager import sio

@sio.on("update_inventory")
async def handle_inventory_update(sid, data):
    print(f"Inventory update from {sid}: {data}")
    # Logic to handle inventory update via socket if needed
    await sio.emit("stock_update", data, room='stock_updates')

@sio.on("emergency_broadcast")
async def handle_emergency_broadcast(sid, data):
    print(f"Emergency broadcast: {data}")
    await sio.emit("emergency_alert", data, room='emergency_alerts')
