import router from 'umi/router';
import URI from "urijs";

export function redirectByURL(toURL: string, current: string) {
  if (current !== toURL) {
    router.push(toURL);
  }
}


export function updateQueryParamAndReplaceURL(queryParameters: any, pathName?: string) {
  let basePath = pathName;
  if (pathName === undefined) {
    basePath = window.location.pathname
  }
  const searchQuery = URI(window.location.search).setSearch(queryParameters).toString();
  router.replace(`${basePath}${searchQuery}`)
}

export function getPaginationFromURL(query: { [key: string]: string }, defaultPage: number, defaultPageSize: number) : {page:number,pageSize:number}{
  return {
    page: ("page" in query) ? Number(query.page) : defaultPage,
    pageSize: ("pageSize" in query) ? Number(query.pageSize) : defaultPageSize
  }
}

export function getOrdersFromUrlQuery(query: any, defaultOrderString: string): { order: "asc" | "desc", orderKey: string }[] {
  if (Array.isArray(query)) {
    return query.map((queryString: string) => ({
      order: queryString.startsWith("-") ? "desc" : "asc",
      orderKey: queryString.slice(queryString[0] === "-" ? 1 : 0)
    }))
  }
  if (typeof query === "string") {
    return [{
      order: query.startsWith("-") ? "desc" : "asc",
      orderKey: query.slice(query[0] === "-" ? 1 : 0)
    },]
  }
  return [{
    order: defaultOrderString.startsWith("-") ? "desc" : "asc",
    orderKey: defaultOrderString.slice(defaultOrderString[0] === "-" ? 1 : 0)
  },]

}

export function encodeOrderToUrl(orders: { order: "asc" | "desc", orderKey: string }[]): string[] {
  return orders.map(orderItem => `${orderItem.order === "asc" ? "" : "-"}${orderItem.orderKey}`)
}

export function getUrlParamToArray(query: any): any[] {
  if (Array.isArray(query)) {
    return query
  }
  return [query,]
}
