import { CarColor, Settlement } from "@/generated"
import { UUID } from "crypto"

export const colorToText = (carColor: CarColor): String =>  {
    switch (carColor) {
        case CarColor.Black:
            return 'Чёрный'
        case CarColor.Blue:
            return 'Синий'
        case CarColor.White:
            return 'Белый'
        case CarColor.Brown:
            return 'Коричневый'
        case CarColor.Yellow:
            return 'Желтый'
        case CarColor.Red:
            return 'Красный'
        case CarColor.Silver:
            return 'Серебристый'
        default:
            return 'Неизвестное значение!'
      }                          
}

// export const dateToText = (settlement: Settlement): String =>  {
//     if (settlement.departureDateTime.toLocaleDateString() === settlement.arrivalDateTime.toLocaleDateString())
//         return `Отправление: ${settlement.departureDateTime.toLocaleDateString()} ${settlement.departureDateTime.toLocaleTimeString()}
//                 Прибытие ${settlement.arrivalDateTime.toLocaleTimeString()}`
//     return `Отправление: ${settlement.departureDateTime.toLocaleString()} 
//     Прибытие: ${settlement.arrivalDateTime.toLocaleString()}`         
// }

// export const settlementFormatter = (settlement: Settlement): object =>  {
//     var color = colorToText(settlement.car.color);
//                                 const items = {
//                                     value: settlement.id,
//                                     label: settlementDisplayFormatter(settlement)
//                                 };
//                                 return items;                 
// }

export const settlementDisplayFormatter = (settlement: Settlement): String =>  {
    return `${settlement.name} - "${settlement.name}`;                 
}

// export const flightDateToText = (flight: Flight): String =>  {
//     if (flight.departureDateTime.toLocaleDateString() === flight.arrivalDateTime.toLocaleDateString())
//         return `Отправление: ${flight.departureDateTime.toLocaleDateString()} ${flight.departureDateTime.toLocaleTimeString()}
//                 Прибытие ${flight.arrivalDateTime.toLocaleTimeString()}`
//     return `Отправление: ${flight.departureDateTime.toLocaleString()} 
//     Прибытие: ${flight.arrivalDateTime.toLocaleString()}`         
// }

// export const flightDisplayFormatter = (flight: Flight): String =>  {
//     var dates = flightDateToText(flight);
//     return `${flight.departureAirport}  -  ${flight.arrivalAirport}: ${dates}`;                 
// }