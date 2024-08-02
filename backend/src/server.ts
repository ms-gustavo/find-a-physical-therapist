import app, { env } from "./index";

const PORT = env === "development" ? 5000 : 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
