await Bun.build({
  entrypoints: ["./index.ts", "./client.ts", "./client-http.ts"],
  outdir: "./dist",
});
