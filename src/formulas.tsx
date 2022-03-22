export interface Formula {
    name: string;
    variables: (JSX.Element | string)[];
    calculate: (...variables: number[]) => number;
}

export const FORMULAS: Formula[] = [
    {
        name: "T Score (Two Distribution)",
        variables: [
            <span>SS<sub>1</sub></span>,
            <span>SS<sub>2</sub></span>,
            <span>n<sub>1</sub></span>,
            <span>n<sub>2</sub></span>,
            <span>M<sub>1</sub></span>,
            <span>M<sub>2</sub></span>,
        ],
        calculate: (ss1, ss2, n1, n2, m1, m2) => {
            let sp = (ss1 + ss2) / (n1 + n2 - 2);
            return (m1 - m2) / Math.sqrt((sp / n1) + (sp / n2));
        }
    },
    {
        name: "Z Score",
        variables: ["M", "μ", "n", "σ"],
        calculate: (m, mu, n, sigma) => {
            return (m - mu) * Math.sqrt(n) / sigma;
        }
    },
    {
        name: "T Score",
        variables: ["M", "μ", "n", "s"],
        calculate: (m, mu, n, s) => {
            return (m - mu) * Math.sqrt(n) / s;
        }
    }
];