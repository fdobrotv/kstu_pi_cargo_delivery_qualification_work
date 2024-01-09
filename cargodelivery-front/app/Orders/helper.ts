import { CarColor, Settlement } from "@/generated"

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

export const settlementDisplayFormatter = (settlement: Settlement): String =>  {
    return `${settlement?.name} - "${settlement?.name}`;
}