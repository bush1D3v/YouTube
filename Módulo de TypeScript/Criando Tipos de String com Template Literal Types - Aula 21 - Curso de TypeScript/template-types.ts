type Resource = "user" | "post" | "comment";

type Endpoint = `/api/${Resource}`;

type Version = `v${number}.${number}.${number}` // v1.1.0 - ERRO -> v1.1