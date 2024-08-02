import app, { env } from "./index";

const PORT = env === "development" && 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
