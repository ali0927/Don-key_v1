import { IBugFormState } from "components/BugReportForm";
import { strapi } from "strapi";

export const useBugReportApi = () => {
  const fetchList = async () => {
    const resp = await strapi.get("/bug-reports");
    return resp.data;
  };
  const createBug = async (formState: IBugFormState) => {
    const {
      name,
      page,
      attachment,
      email,
      message,
      type,
      walletAddress,
      urgency,
      telegram,
      title
    } = formState;

    const Extras = [];
    if (page) {
      Extras.push({
        __component: "component.location",
        page,
      });
    }
    if (walletAddress) {
      Extras.push({
        __component: "component.wallet-details",
        walletAddress,
      });
    }
    if (attachment) {
      const formData = new FormData();
      formData.append("files", attachment);
      const resp = await strapi.post("/upload", formData);
      Extras.push({
        __component: "component.attachment",
        Attachment: resp.data[0].id,
      });
    }

    const resp = await strapi.post("/bug-reports", {
      name,
      email,
      message,
      type,
      telegram,
      urgency,
      title,
      Extras,
    });
    return resp.data;
  };
  return {
    createBug,
    fetchList,
  };
};
