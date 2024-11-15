import { watch } from "node:fs";
import { readdir } from "node:fs/promises";

const routesRoot = "/golinks/routes";

const createConfig = async () => {
  const routesFilePaths: string[] = await readdir(routesRoot);
  const routesJson = (
    await Promise.all(
      routesFilePaths.map<Promise<Record<string, string>>>(
        async (path: string) => {
          try {
            return await Bun.file(`${routesRoot}/${path}`).json();
          } catch {
            return {};
          }
        },
      ),
    )
  ).reduce((a, b) => ({ ...a, ...b }), {});

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

watch(routesRoot, async () => {
  server.reload(await createConfig());
});
