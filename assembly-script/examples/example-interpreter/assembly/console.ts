
export namespace console {
  @external("env", "console.log")
  declare function log(s: string): void
}

