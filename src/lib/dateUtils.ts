import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

export const formatDate = (dateString: Date | string) => {
    return dayjs(dateString);
}

export const formatFromNow = (dateString: Date | string) => {
    return dayjs(dateString).fromNow();
}