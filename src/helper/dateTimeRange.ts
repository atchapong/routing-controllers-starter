import * as moment from "moment";
import {extendMoment} from "moment-range";
const {range} = extendMoment(moment);

const verifyDateTimeRange = async (date: any) => {
    const dateData: Date = new Date(date),
        dateCurrent: Date = new Date(),
        diffInMs: any = range(dateData, dateCurrent),
        sec: number = diffInMs.valueOf() / 1000;

    return sec;
};

export default verifyDateTimeRange