declare module '@figma/code-connect' {
  export type EnumOptions<T extends string> = Record<string, T>;

  interface FigmaAPI {
    connect(component: unknown, nodeUrl: string, options: unknown): void;
    enum<T extends string>(name: string, options: EnumOptions<T>): T;
    boolean(name: string): boolean;
    string(name: string): string;
    number(name: string): number;
    instanceSwap?(name: string, options: Record<string, string>): string;
  }

  const figma: FigmaAPI;
  export default figma;
}


