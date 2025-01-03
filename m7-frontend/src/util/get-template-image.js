import TemplateImage_0 from "./../assets/template/TemplateImage_0.svg";
import TemplateImage_1 from "./../assets/template/TemplateImage_1.svg";
import TemplateImage_2 from "./../assets/template/TemplateImage_2.svg";
import TemplateImage_3 from "./../assets/template/TemplateImage_3.svg";

export function getTemplateImage(templateId) {
  switch (templateId) {
    case 0:
      return TemplateImage_0;
    case 1:
      return TemplateImage_1;
    case 2:
      return TemplateImage_2;
    case 3:
      return TemplateImage_3;
  }
}
