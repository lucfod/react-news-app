import { AppDataSource } from "./datasource";
import { Crypt } from "../lib/crypt.lib";
import { User } from "./models/user";
import { Category } from "./models/category";
import { Region } from "./models/region";
import { Post } from "./models/post";
import { Tag } from "./models/tag";
import { Link } from "./models/link";

export async function DbInit() {
  await AppDataSource.synchronize(true);

  const categories = [
    { id: null, name: "Lanzamiento de Productos" },
    { id: null, name: "Cooperaciones" },
    { id: null, name: "Compras y Adquisiciones" },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Category)
    .values(categories)
    .orIgnore()
    .execute();

  const regions = [
    { id: null, name: "Argentina" },
    { id: null, name: "Portugal" },
    { id: null, name: "Italia" },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Region)
    .values(regions)
    .orIgnore()
    .execute();

  const users = [
    {
      id: null,
      firstName: "Administrator",
      lastName: "Administrator",
      email: "admin@prueba.com",
      password: await Crypt.encrypt("prueba"),
    },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values(users)
    .orIgnore()
    .execute();

  const posts = [
    {
      id: null,
      content:
        "Nueva adquisición: SteticABC acaba de anunciar un acuerdo para comprar SteticDEF con el objetivo de aumentar su presencia en el mercado alemán. El acuerdo se estima en alrededor de 2 millones de euros Lea más en SteticNews o NewsDaily.",
      category: 2,
      region: 1,
      user: 1,
    },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Post)
    .values(posts)
    .orIgnore()
    .execute();

  const tags = [
    {
      id: null,
      tag: "SteticNews",
      post: 1,
    },
    { id: null, tag: "NewsDaily", post: 1 },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Tag)
    .values(tags)
    .orIgnore()
    .execute();

  const links = [
    {
      id: null,
      name: "SteticNews",
      url: "https://steticnews.com.ar",
      post: 1,
    },
    { id: null, name: "NewsDaily", url: "https://newsdaily.com", post: 1 },
  ];

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Link)
    .values(links)
    .orIgnore()
    .execute();
}
