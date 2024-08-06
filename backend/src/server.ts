import app, { env } from "./index";
import { setupSwagger } from "./swagger";

const PORT = env === "development" ? 5000 : 5050;

setupSwagger(app);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
