export function pagination(c, m, delta = 2): Array<String> {
    let current = c,
        last = m,
        left = current - delta,
        right = current + delta + 1,
        range = []


    for (let i = 1; i <= last; i++) {
        if (i >= left && i < right) {
            range.push({value: i, text: i});
        }
    }
    return range;
}
