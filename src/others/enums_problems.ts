// src/others/enums_problems.ts

// ## 課題
// このファイルではEnums（列挙型）の基本的な利用例と、それに潜む潜在的な問題を示しています。
// TypeScriptのEnumをより堅牢に、より意図が明確になるようにリファクタリングしてみましょう。
//
// 1. **`LogLevel` Enumの定義**:
//    現在、数値Enumとして定義されていますが、ログレベルのような値は文字列として表現されることも多いです。
//    String Enumに変更した場合のメリット・デメリットを考慮し、String Enumとして再定義してみましょう。
//    また、特定のケース（例: UI表示用）で文字列として利用しやすいように工夫してみましょう。
//
// 2. **`Weekdays` Enumの利用**:
//    `isWeekend` 関数では、直接数値と比較していますが、Enumの値を使って比較することで、
//    コードの可読性と意図を向上させることができます。Enumの値を使って比較するように修正してみましょう。
//
// 3. **`OrderStatus` Enumの問題点**:
//    `getOrderStatusText` 関数では、Enumの数値に対応する文字列を返していますが、
//    新しいステータスが追加された場合に `switch` 文の更新を忘れる可能性があります。
//    この問題を解決するために、Enumとオブジェクトリテラル（または `Map`）を組み合わせて
//    より拡張性の高い方法でステータス名を取得できるようにリファクタリングしてみましょう。
//
// 4. **マジックナンバーの排除と `const enum` の検討**:
//    `PaymentMethod` Enumは、支払い方法の選択肢を表していますが、
//    コード内で `0` や `1` といったマジックナンバーを直接使うのを避けるべきです。
//    また、このEnumがコンパイル時に完全にインライン化されるべきか (`const enum`) を検討してみましょう。

// --- 課題1: LogLevel Enum (数値Enum) ---
enum LogLevel {
    ERROR,   // 0
    WARN,    // 1
    INFO,    // 2
    DEBUG    // 3
}

function logMessage(level: LogLevel, message: string) {
    if (level === LogLevel.ERROR) {
        console.error(`[ERROR]: ${message}`);
    } else if (level === LogLevel.WARN) {
        console.warn(`[WARN]: ${message}`);
    } else {
        console.log(`[${LogLevel[level]}]: ${message}`);
    }
}

logMessage(LogLevel.INFO, "User logged in.");


// --- 課題2: Weekdays Enum (数値Enum) ---
enum Weekdays {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

function isWeekend(day: number): boolean { // dayはWeekdays Enumのインデックスと一致する想定
    return day === 0 || day === 6; // マジックナンバーで比較している
}

console.log(`Is Monday a weekend? ${isWeekend(Weekdays.Monday)}`);
console.log(`Is Sunday a weekend? ${isWeekend(Weekdays.Sunday)}`);


// --- 課題3: OrderStatus Enumと文字列変換 ---
enum OrderStatus {
    Pending,     // 0
    Processing,  // 1
    Shipped,     // 2
    Delivered,   // 3
    Cancelled    // 4
}

function getOrderStatusText(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.Pending: return "注文受付中";
        case OrderStatus.Processing: return "処理中";
        case OrderStatus.Shipped: return "発送済み";
        case OrderStatus.Delivered: return "配達済み";
        case OrderStatus.Cancelled: return "キャンセル済み";
        default: return "不明なステータス";
    }
}

console.log(`Order status 1: ${getOrderStatusText(OrderStatus.Processing)}`);


// --- 課題4: PaymentMethod Enum (マジックナンバーの問題) ---
enum PaymentMethod {
    CreditCard,  // 0
    PayPal,      // 1
    BankTransfer // 2
}

function processPayment(amount: number, method: number) { // methodはPaymentMethodの数値と一致する想定
    if (method === 0) { // マジックナンバー
        console.log(`Processing ${amount} via Credit Card.`);
    } else if (method === 1) { // マジックナンバー
        console.log(`Processing ${amount} via PayPal.`);
    } else {
        console.log(`Processing ${amount} via Bank Transfer.`);
    }
}

processPayment(100, PaymentMethod.CreditCard);
