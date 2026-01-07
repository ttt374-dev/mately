import { format } from "date-fns";

export function formatDate(date: number, formatString: string = "yyyy/MM/dd hh:mm"): string {
    //return new Date(date).toLocaleString("ja-JP")
    return format(date, formatString)
}