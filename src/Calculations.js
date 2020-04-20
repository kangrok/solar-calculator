import {getSunrise, getSunset} from "sunrise-sunset-js";

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

    latitudeIsValid(latitude) {
        const deg = Array.isArray(latitude) ? this.getDeg(latitude) : latitude;
        return deg >= -90 && deg <= 90;
    };

    longitudeIsValid(longitude) {
        const deg = Array.isArray(longitude) ? this.getDeg(longitude) : longitude;
        return deg >= -180 && deg <= 180;
    };

    dateIsValid(date) {
        return date !== null && !isNaN(date.getTime());
    }

    stateIsValid(latitude, longitude, date) {
        return this.latitudeIsValid(latitude) && this.longitudeIsValid(longitude) && this.dateIsValid(date);
    }

    toUTC(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(),
            date.getUTCMinutes(), date.getUTCSeconds()));
    }

    getSunrise(latitude, longitude, date) {
        return this.toUTC(getSunrise(latitude, longitude, date));
    }

    getSunset(latitude, longitude, date) {
        const sunrise = this.getSunrise(latitude, longitude, date);
        let sunset = this.toUTC(getSunset(latitude, longitude, date));

        // If sunset occurs on next day.
        let d = this.toUTC(date);
        if (sunset < sunrise) {
            sunset = this.toUTC(getSunset(latitude, longitude, new Date(d.setDate(d.getDate() + 1))));
        }
        return sunset;
    }

    getDayLength(sunrise, sunset) {
        return Math.abs(sunset - sunrise);
    }

    getDayLengthString(sunrise, sunset) {
        return this.formatDayLength(this.getDayLength(sunrise, sunset))
    }
}
