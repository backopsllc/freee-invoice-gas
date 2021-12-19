export interface Http {
  get: (uri: string) => JSON;
  getWithAccessToken: (uri: string, accessToken: string) => JSON;
  post: (uri: string, payload: any) => JSON;
}

export class HttpClient implements Http {
  public get(uri: string): JSON {
    const httpResponse = this.doRequest(uri);
    return this.toJson(httpResponse);
  }

  public getWithAccessToken(uri: string, accessToken: string): JSON {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };
    const httpResponse = this.doRequest(uri, options);
    return this.toJson(httpResponse);
  }

  public post(uri: string, data: any): JSON {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      payload: data,
    };
    const httpResponse = this.doRequest(uri, options);
    return this.toJson(httpResponse);
  }

  private doRequest(
    uri: string,
    options?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  ): GoogleAppsScript.URL_Fetch.HTTPResponse {
    if (options === null || options === undefined) {
      return UrlFetchApp.fetch(uri);
    } else {
      return UrlFetchApp.fetch(uri, options);
    }
  }

  private toJson(response: GoogleAppsScript.URL_Fetch.HTTPResponse): JSON {
    console.log('getContentText = ' + response.getContentText());
    return JSON.parse(response.getContentText());
  }
}
