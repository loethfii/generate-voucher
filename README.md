<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
$ npx prisma db push
```

## Running the app

```bash
# development
$ npm run start

# watch mode and pull schema db from database
$ npm run start:dev

# production mode
$ npm run start:prod
```

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

### DDL 
```sql
CREATE TABLE public.master_voucher (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	name varchar(100) NULL,
	start_date date NULL,
	end_date date NULL,
	amount float8 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT master_voucher_pk PRIMARY KEY (id)
);
```

```sql
CREATE TABLE public.uvcvoucher (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	voucher_id uuid NULL,
	code varchar(255) NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT uvcvoucher_pk PRIMARY KEY (id),
	CONSTRAINT uvcvoucher_unique UNIQUE (code),
	CONSTRAINT uvcvoucher_master_voucher_fk FOREIGN KEY (voucher_id) REFERENCES public.master_voucher(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
