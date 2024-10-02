## Voucher API

### Swagger web

`http://localhost:3000/api`

## API Property

`example port on 3000`

### 1. Generate Voucher

API for generate voucher.

- **Endpoint**: `POST /api/v1/voucher/generate`
- **URL**: `http://localhost:3000/api/v1/voucher/generate`
- **Content-Type**: `application/json`

#### Request Body

| Field             | Type   | Description                                     | Required |
| ----------------- | ------ | ----------------------------------------------- | -------- |
| `voucher_name`    | String | Nama voucher                                    | Yes      |
| `amount`          | Number | Jumlah nominal voucher                          | Yes      |
| `num_generations` | Number | Jumlah voucher yang akan di-generate            | Yes      |
| `start_date`      | String | Tanggal mulai voucher dalam format `YYYY-MM-DD` | Yes      |
| `end_date`        | String | Tanggal akhir voucher dalam format `YYYY-MM-DD` | Yes      |
| `char_length`     | Number | Panjang karakter dari kode voucher              | Yes      |

#### CURL

```bash
curl --location 'http://localhost:3000/api/v1/voucher/generate' \
--header 'Content-Type: application/json' \
--data '{
    "voucher_name" : "100.000 voucher susu",
    "amount" : 50000,
    "num_generations" : 100000,
    "start_date" : "2024-12-14",
    "end_date" : "2024-12-14",
    "char_length" : 7
}'
```

### Response

```bash
{
    "data": [
        {
            "count": 30000
        },
        {
            "count": 30000
        },
        {
            "count": 30000
        },
        {
            "count": 10000
        }
    ],
    "_meta": {
        "message": "Generate voucher success",
        "status": 200
    }
}
```

### 2. Update Voucher

API for generate voucher.

- **Endpoint**: `PATCH /api/v1/voucher/update/:voucherId`
- **URL**: `http://localhost:3000/api/v1/voucher/update/{voucherId}`
- **Content-Type**: `application/json`

### Request Parameters

| Parameter   | Type   | Description                     | Required |
| ----------- | ------ | ------------------------------- | -------- |
| `voucherId` | String | ID voucher yang ingin di-update | Yes      |

### Request Body

| Field          | Type   | Description                                     | Required |
| -------------- | ------ | ----------------------------------------------- | -------- |
| `voucher_name` | String | Nama voucher yang baru                          | Yes      |
| `amount`       | Number | Jumlah nominal voucher baru                     | Yes      |
| `start_date`   | String | Tanggal mulai voucher dalam format `YYYY-MM-DD` | Yes      |
| `end_date`     | String | Tanggal akhir voucher dalam format `YYYY-MM-DD` | Yes      |
| `char_length`  | Number | Panjang karakter dari kode voucher              | Yes      |

### Example Request

```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/voucher/update/2b9be553-11b1-4803-bebd-85ab0ddd7e91' \
--header 'Content-Type: application/json' \
--data '{
    "voucher_name" : "100.000 voucher susu ultra",
    "amount" : 70000,
    "start_date" : "2024-12-14",
    "end_date" : "2024-12-14",
    "char_length" : 10
}'
```

### Example Response

```bash
    {
        "data": [
            {
                "count": 30000
            },
            {
                "count": 30000
            },
            {
                "count": 30000
            },
            {
                "count": 10000
            }
        ],
        "_meta": {
            "message": "Update voucher success",
            "status": 200
        }
    }
```
