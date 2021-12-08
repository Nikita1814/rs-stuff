import { Source } from "../../controller/loader";
import "./sources.css";

class Sources {
  draw(data: Source[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector(
      "#sourceItemTemp"
    ) as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(
        true
      ) as HTMLTemplateElement;

      (
        sourceClone.querySelector(".source__item-name") as HTMLElement
      ).textContent = item.name;
      sourceClone
        .querySelector(".source__item")
        ?.setAttribute("data-source-id", item.id);

      fragment.append(sourceClone);
    });

    document.querySelector(".sources")?.append(fragment);
  }
}

export default Sources;
