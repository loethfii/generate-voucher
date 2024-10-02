import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  async get(url: string, config: Object = {}): Promise<any> {
    try {
      const response = await axios.get(url, config);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to fetch:', response.statusText);
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(url: string, config: Object = {}): Promise<any> {
    try {
      const response = await axios.delete(url, config);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to fetch:', response.statusText);
      }
    } catch (error) {
      throw error;
    }
  }

  async post(
    url: string,
    data: Object = {},
    config: Object = {},
  ): Promise<any> {
    try {
      const response = await axios.post(url, data, config);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to fetch:', response.statusText);
      }
    } catch (error) {
      throw error;
    }
  }

  async patch(
    url: string,
    data: Object = {},
    config: Object = {},
  ): Promise<any> {
    try {
      const response = await axios.patch(url, data, config);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      throw error;
    }
  }

  async put(url: string, data: Object = {}, config: Object = {}): Promise<any> {
    try {
      const response = await axios.put(url, data, config);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      throw error;
    }
  }
}
