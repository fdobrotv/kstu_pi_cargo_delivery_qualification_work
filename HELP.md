# Getting Started

## Setup dependencies and base project
### OS (Ubuntu)
    sudo apt-get install nodejs npm
    npm install @openapitools/openapi-generator-cli -g

### Back-end

#### Generate DTOs and interfaces from OpenAPI specification
    brew install openapi-generator
    openapi-generator generate -g spring -o generated --api-package com.fdobrotv.cargodelivery.api --invoker-package com.fdobrotv.cargodelivery.invoker --model-package com.fdobrotv.cargodelivery.dto -i specs/cargodelivery-v1.0.yaml
    openapi-generator generate -g typescript-fetch -o cargodelivery-front/generated --api-package com.fdobrotv.cargodelivery.api --invoker-package com.fdobrotv.cargodelivery.invoker --model-package com.fdobrotv.cargodelivery.dto -i specs/cargodelivery-v1.0.yaml

#### Setup local development env
    brew install docker-compose
    brew install colima
    brew install libpq
    
    # delete existing instance!
    colima delete 
    colima start

### Front-end
    brew install npm yarn next
    npm i -g next
    npx create-next-app@latest
        Ok to proceed? (y) y
        ✔ What is your project named? … cargodelivery-front
        ✔ Would you like to use TypeScript? … No / Yes
        ✔ Would you like to use ESLint? … No / Yes
        ✔ Would you like to use Tailwind CSS? … No / Yes
        ✔ Would you like to use `src/` directory? … No / Yes
        ✔ Would you like to use App Router? (recommended) … No / Yes
        ✔ Would you like to customize the default import alias (@/*)? … No / Yes

### Web packager examples
    pnpm install clsx

## Development run

### Environment
    docker-compose up

### Back-end
    ./gradlew bootRun

### Front-end
    next dev

### Open in browser
    http://localhost:3000
