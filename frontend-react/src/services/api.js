export async function assessAQI(data) {
  const response = await fetch("http://127.0.0.1:8000/assess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return response.json();
}
