// Lista encadeada
type ListNode<t> = {
    value: t;
    next?: ListNode<t>;
}

const list: ListNode<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3
        }
    }
};

// Árvore genérica
type Tree<T> = {
    value: T;
    children?: Array<Tree<T>>;
}

const tree: Tree<number> = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                { value: 4 },
                { value: 5 }
            ]
        },
        {
            value: 3,
            children: [
                { value: 6 },
                { value: 7 }
            ]
        }
    ]
};

// Estrutura de árvore de arquivos

type FileNode = { type: 'file'; name: string; size: number };
type DirNode  = { type: 'dir';  name: string; children: FsNode[] };
type FsNode = FileNode | DirNode;

function getTotalSize(node: FsNode): number {
  return node.type === 'file'
    ? node.size
    : node.children.reduce((sum, child) => sum + getTotalSize(child), 0);
}

const project: FsNode = {
  type: 'dir',
  name: 'src',
  children: [
    { type: 'file', name: 'index.ts', size: 1200 },
    { type: 'dir', name: 'components', children: [
      { type: 'file', name: 'Button.tsx', size: 2200 }
    ]}
  ],
};

// JSON recursivo tipado

type JSONPrimitive = string | number | boolean | null;
interface JSONObject { [k: string]: JSONValue }
type JSONArray = JSONValue[];
type JSONValue = JSONPrimitive | JSONObject | JSONArray;

function isJSONValue(v: unknown): v is JSONValue {
  if (v === null) return true;
  const t = typeof v;
  if (t === 'string' || t === 'number' || t === 'boolean') return true;
  if (Array.isArray(v)) return v.every(isJSONValue);
  if (t === 'object') return Object.values(v as object).every(isJSONValue);
  return false;
}

// Deep utils: DeepPartial, DeepReadonly, DeepNonNullable

type DeepPartial<T> =
  T extends Function ? T :
  T extends Array<infer U> ? Array<DeepPartial<U>> :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;

type DeepReadonly<T> =
  T extends Function ? T :
  T extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>> :
  T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } :
  T;

type DeepNonNullable<T> =
  T extends null | undefined ? never :
  T extends Array<infer U> ? Array<DeepNonNullable<U>> :
  T extends object ? { [K in keyof T]: DeepNonNullable<T[K]> } :
  T;

// Exemplos de uso das Deep utils

type Example = {
  a: number;
  b: {
    c: string;
    d: boolean;
  };
  e: Array<{ f: null | undefined | { g: number } }>;
};
type PartialExample = DeepPartial<Example>;
type ReadonlyExample = DeepReadonly<Example>;
type NonNullableExample = DeepNonNullable<Example | null | undefined>;

// Referências circulares

type BiNode<T> = {
  value: T;
  parent?: BiNode<T>;
  children?: BiNode<T>[];
};

// Lazy Types

type Prev = [0,0,1,2,3,4,5,6,7,8,9]; // amplie conforme necessário

type DepthSafeDeepPartial<T, D extends number = 5> =
  D extends 0 ? T :
  T extends Function ? T :
  T extends Array<infer U> ? Array<DepthSafeDeepPartial<U, Prev[D]>> :
  T extends object ? { [K in keyof T]?: DepthSafeDeepPartial<T[K], Prev[D]> } :
  T;

type Lazy<T> = () => T;

type LazyTree<T> = {
  value: T;
  children?: Lazy<Array<LazyTree<T>>>;
};