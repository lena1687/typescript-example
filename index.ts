import React from 'react';

// Задание первого уровня 1
// В функцию приходит массив состояний заказа и фильтруется
// Нужно заменить OrderStateResultType на тип который вычисляется на освове OrderState
// eslint-disable-next-line @typescript-eslint/no-explicit-any

type initialOrderStates =  "initial"| "inWork"| "buyingSupplies"| "producing"| "fullfilled";
const orderStates:Readonly<initialOrderStates[]> = ["initial", "inWork", "buyingSupplies", "producing", "fullfilled"] as const;
type OrderStateResultType = Exclude<initialOrderStates, "buyingSupplies" | "producing">[]
type OrderState = typeof orderStates[number];
const getUserOrderStates = (orderStates: OrderState[]): OrderStateResultType => {
    const filteredStates:OrderStateResultType = [];
    orderStates.forEach((element) => {
        if (element !== "buyingSupplies" && element !== "producing") {
            filteredStates.push(element);
        }
    });
    return filteredStates;
};

// Задание первого уровня 2
// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить StateTypes на тип который достанет из Order все возможные состояния (state)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StateTypes = Order["state"];
type Order = | {
    state: "initial";
    sum: number;
}  | {
    state: "inWork";
    sum: number;
    workerId: number;
} | {
    state: "buyingSupplies";
    sum: number;
    workerId: number;
    suppliesSum: number;
} | {
    state: "producing";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
} | {
    state: "fullfilled";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
    fullfillmentDate: Date;
};
const getOrderState = (order: Order): StateTypes => order.state;

// Задание первого уровня 3
// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить WithoutKeyType на соответствующий тип
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WithoutKeyType<T extends Record<any, any>, K extends keyof T> = Omit<T, K>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const omit = <T extends Record<any, any>, K extends keyof T>(
    obj: T,
    keyToOmit: K
): WithoutKeyType<T,K> => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [keyToOmit]: _, ...withoutKey } = obj;
    return withoutKey;
};
//obj = {"age": 2, "job":value, {"age": value, "job":value}}

// Задание второго уровня 1
// Есть объединение (юнион) типов заказов в различных состояниях
// и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
// А возвращает только initial и inWork
// Нужно заменить FilterOnlyInitialAndInWorkOrderType на правильный тип вычисленный на основе Order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InitialAndInWorkOrderType = "initial" | "inWork";
type FilterOnlyInitialAndInWorkOrderType = Record<'state', InitialAndInWorkOrderType> | null;
type SpecialOrder =
    | {
    state: "initial";
    sum: number;
}
    | {
    state: "inWork";
    sum: number;
    workerId: number;
}
    | {
    state: "buyingSupplies";
    sum: number;
    workerId: number;
    suppliesSum: number;
}
    | {
    state: "producing";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
}
    | {
    state: "fullfilled";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
    fullfillmentDate: Date;
};
const filterOnlyInitialAndInWorkOrder = (order: SpecialOrder): FilterOnlyInitialAndInWorkOrderType => {
    if (order.state === "initial" || order.state === "inWork") {
        return order;
    }
    return null;
};

// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить DefaultPropsType и UserOrderStatesType на правильный тип
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DefaultPropsType<T> = T extends { defaultProps: infer U } ? U : unknown
// Hint: infer
const getDefaultProps = <T>(
    component: React.ComponentType<T>
): DefaultPropsType<React.ComponentType<T>> => {
    return component.defaultProps;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type initialOrderStatesList =  "initial"| "inWork"| "buyingSupplies"| "producing"| "fullfilled";
type UserOrderStatesType = Omit<initialOrderStatesList, "buyingSupplies" | "producing">[];
const orderStatesList = [
    "initial",
    "inWork",
    "buyingSupplies",
    "producing",
    "fullfilled",
] as const;
type OrderStateItem = typeof orderStatesList[number];
// Hint: type guards
export const getUserOrderStateItems = (orderStatesList: OrderStateItem[]): UserOrderStatesType =>
    orderStatesList.filter(
        (state) => state !== "buyingSupplies" && state !== "producing"
    );