import { watch } from "fs";

const routesPath = `${import.meta.dir}/routes.json`;
const routesFile = Bun.file(routesPath);
if (!(await routesFile.exists())) {
  await Bun.write(routesFile, "{}");
}

const createConfig = async () => {
  let routesJson: Record<string, string>;
  try {
    routesJson = await Bun.file(routesPath).json();
  } catch {
    routesJson = {};
  }

  const routes = Object.fromEntries(
    Object.entries(routesJson).map(([from, to]) => [
      from,
      Response.redirect(to, 301),
    ]),
  );

  return {
    hostname: "0.0.0.0",
    port: 80,
    static: {
      ...routes,
      "/_api/_list": Response.json(routesJson),
      "/_list": new Response(
        await Bun.file(`${import.meta.dir}/_list.html`).bytes(),
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      ),
    },
    fetch() {
      return Response.redirect("/_list", 301);
    },
  };
};

const server = Bun.serve(await createConfig());

console.log(`Serving on ${server.url} ...`);

watch(import.meta.dir, async () => {
  server.reload(await createConfig());
});
