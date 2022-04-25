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
        name: "Z Score / T Score (Hypothesis)",
        variables: ["M", "μ", "n", "σ / s"],
        calculate: (m, mu, n, sigma) => {
            return (m - mu) * Math.sqrt(n) / sigma;
        }
    },
    {
        name: "Standard Deviation",
        variables: ["SS", "n"],
        calculate: (SS, n) => {
            return Math.sqrt(SS / (n - 1));
        }
    },
    {
        name: "Z Score",
        variables: ["x", "M", "σ / s"],
        calculate: (x, M, sigma) => {
            return (x - M) / sigma;
        }
    },
    {
        name: "s",
        variables: ["SS", "n"],
        calculate: (SS, n) => {
            return Math.sqrt(SS / (n - 1));
        }
    },
    {
        name: "Median",
        variables: ["n"],
        calculate: (n) => {
            return Math.floor((n + 1) / 2);
        }
    },
    {
        name: "Percentile",
        variables: ["n", "k"],
        calculate: (n, k) => {
            return Math.floor(k * (n + 1) / 100);
        }
    },
    {
        name: "Quartile",
        variables: ["n", "k"],
        calculate: (n, k) => {
            return Math.floor(k * (n + 1) / 4);
        }
    },
    {
        name: "Range",
        variables: ["min", "max"],
        calculate: (min, max) => {
            return max - min;
        }
    },
];