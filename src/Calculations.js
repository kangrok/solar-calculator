import {getTimes, getPosition} from "suncalc"

export default class Calculations {

    getDeg(coordinate) {
        if (coordinate[0].charAt(0) === "-") {
            return -parseFloat(coordinate[0].substring(1)) - parseFloat(coordinate[1]) / 60 - parseFloat(coordinate[2]) / 3600;
        }
        return parseFloat(coordinate[0]) + parseFloat(coordinate[1]) / 60 + parseFloat(coordinate[2]) / 3600;
    };

    getDegMinSec(dec) {
        let deg = Math.floor(dec),
            min = Math.floor((dec - deg) * 60),
            sec = Math.round((dec - deg - min / 60) * 3600);
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            deg++;
            min = 0;
        }

        return [deg.toString(), min.toString(), sec.toString()]
    };

    formatDayLength(ms) {
        const s = ms / 1000;
        let sec = Math.floor(s % 60),
            min = Math.floor((s / 60) % 60),
            hr = Math.floor(s / 60 / 60 % 24),
            d = Math.floor(s / 60 / 60 / 24);
        return (d === 0 ? "" : d + "d ") + hr + "h " + min + "m " + sec + "s";
    };

    latIsValid(latitude) {
        const deg = Array.isArray(latitude) ? this.getDeg(latitude) : latitude;
        return deg >= -90 && deg <= 90;
    };

    lngIsValid(longitude) {
        const deg = Array.isArray(longitude) ? this.getDeg(longitude) : longitude;
        return deg >= -180 && deg <= 180;
    };

    dateIsValid(date) {
        return date !== null && !isNaN(date.getTime());
    }

    stateIsValid(latitude, longitude, date) {
        return this.latIsValid(latitude) && this.lngIsValid(longitude) && this.dateIsValid(date);
    }

    getSunrise(latitude, longitude, date) {
        return getTimes(date, latitude, longitude,).sunrise;
    }

    getSunset(latitude, longitude, date) {
        return getTimes(date, latitude, longitude).sunset;
    }

    getDayLength(lat, lng, date) {
        const sunrise = this.getSunrise(lat, lng, date);
        const sunset = this.getSunset(lat, lng, date);
        return Math.abs(sunset - sunrise);
    }

    getDayLengthString(sunrise, sunset) {
        return this.formatDayLength(Math.abs(sunset-sunrise));
    }

    msToHrs(ms) {
        return (ms / 1000 / 60 / 60) % 24;
    }

    getPolarDayLength(lat, lng, date) {
        const times = getTimes(date, lat, lng);
        const d = new Date(date);

        // Currently classify edge cases as either polar day or polar night.
        // If there is a sunrise and next day is a polar event, then this is the start of a polar day.
        // Otherwise if there is a sunrise and next day is not a polar event, then it is the end of a polar night.
        if (times.sunrise.toString() !== "Invalid Date") {
            if (isNaN(this.getDayLength(lat, lng, new Date(d.setDate(d.getDate() + 1))))) {
                return 24;
            }
            return 0;
        } else if (times.sunset.toString() !== "Invalid Date") {
            if (isNaN(this.getDayLength(lat, lng, new Date(d.setDate(d.getDate() + 1))))) {
                return 0
            }
            return 24;
        }
        return getPosition(d, lat, lng).altitude >= 0 ? 24 : 0;
    }

    getGraphDayLength(lat, lng, date) {
        let dayLength = this.msToHrs(this.getDayLength(lat, lng, date));
        if (isNaN(dayLength)) {
            dayLength = this.getPolarDayLength(lat, lng, date);
        }
        return dayLength;
    }

    getChartData(date1, date2, lat, lng) {
        let data = new Map();
        data.set("labels", []);
        data.set("data", []);
        let d = new Date(date1);
        while (d <= date2) {
            data.get("labels").push(new Date(d));
            data.get("data").push({
                x: new Date(d),
                y: this.getGraphDayLength(lat, lng, d),
            });
            d = new Date(d.setDate(d.getDate() + 1));
        }
        return data;
    }
}
