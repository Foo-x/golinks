# golinks

1. Add `127.0.0.1 go` to the hosts file.
    - Usually located in `C:\Windows\System32\drivers\etc\hosts` on Windows, and `/etc/hosts` on the others.
2. Create JSON files in a directory.
    - e.g. `{ "/example": "https://example.com" }` will redirect `http://go/example` to `https://example.com`
    - The keys must start with `/`.
    - Multiple JSON files will be merged.
3. Run `docker run -v <dir>:/golinks/routes -p 80:80 ghcr.io/foo-x/golinks`.
    - `<dir>` is the directory you created in the step above.
4. Access to `http://go/<path>`.
