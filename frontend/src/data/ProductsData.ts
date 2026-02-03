export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  collectionId: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Grumpy Cat Poster",
    image:
      "https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/okay-bears.png?version=6",
    description: "Everyone's favorite cat who loves to hate",
    price: 15,
    collectionId: 1,
  },
  {
    id: 2,
    name: "Stretch Armstrong",
    image:
      "https://i.seadn.io/gcs/files/7658ace4dbe75413c86d3f3e094e3b93.png?auto=format&dpr=1&w=3840",
    description:
      "He bends! He stretches! He even ties in knots, but always returns to his original shape!",
    price: 20,
    collectionId: 2,
  },
  {
    id: 3,
    name: "Hungry Hungry Hippos Game",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu5EAArhDsVOoUwBOESHfmudbtZMGA7VUxpdYF9qB8KeoKECAnIUFSPdzewaG4Lh-8V_w&usqp=CAU",
    description:
      "It's a race, it's a chase, hurry up and feed their face!",
    price: 30,
    collectionId: 2,
  },
  {
    id: 4,
    name: "Crossfire board game",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wkJA24TAcbt0qORtAngjDdrEtKjvklFnq1cvmeBBtNixNbQs6GMmQZ2yMn42guLNbEE&usqp=CAU",
    description: "You'll get caught up in the crossfire!",
    price: 35,
    collectionId: 3,
  },
];

export default productsData;
