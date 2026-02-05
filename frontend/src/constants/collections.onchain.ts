export interface OnchainCollection {
  name: string;
  address: `0x${string}`;
}

export const ONCHAIN_COLLECTIONS: OnchainCollection[] = [
  {
    name: "Skull Cats",
    address: "0x28563f9902fB208299833DA0f40B5e7047d43AD2",
  },
  {
    name: "Skull Dogs",
    address: "0xA623654b5F71a6b2F8Af9B97E55F2c5F630ae3C4",
  },
  {
    name: "Skull Bears",
    address: "0xd806744A8e4BADC0959691A380e66E05dA9289a3",
  },
];

export const ONCHAIN_FACTORY: string = "0xb4E5509E15D0112Cd738024D976afd8ca614B236";