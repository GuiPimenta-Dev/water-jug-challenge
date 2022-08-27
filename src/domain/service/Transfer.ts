import Jug from "../entities/Jug";

export default function transfer(from: Jug, to: Jug, water: number) {
  from.dumb(water);
  to.fill(water);
}
