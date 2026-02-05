export interface CollectionUI {
  type: number;
  name: string;
  image: string;
}

export const COLLECTIONS_UI: CollectionUI[] = [
  {
    type: 0,
    name: "Skull Cats",
    image: "https://gateway.pinata.cloud/ipfs/bafkreie3rdxv2p6wlzaezztrdixeivzixzdhjtm6avekqd4gbv4xcl6dlm",
  },
  {
    type: 1,
    name: "Skull Dogs",
    image: "https://gateway.pinata.cloud/ipfs/bafybeifolchxejaf2b5hbsnx2dr6ffn55gaxrzem5olkuumcz4ydbknphq",
  },
  {
    type: 2,
    name: "Skull Bears",
    image: "https://gateway.pinata.cloud/ipfs/bafkreigynwmokkbkr4hzknmxkmuuxl7a72fk46ezvpvvdkpjkdogr6ymmm",
  },
];
