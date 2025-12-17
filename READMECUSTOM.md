<p  align="center">
<a  style="display:inline-block; vertical-align:middle;"  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="120"  alt="Nest Logo"  /></a>
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
<a  style="display:inline-block; vertical-align:middle;"  href="http://nestjs.com/"  target="blank"><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg"  width="120"  alt="Prisma Logo"  /></a>
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
<a  style="display:inline-block; vertical-align:middle;"  href="http://nestjs.com/"  target="blank"><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width="120"  alt="Typescript logo"  /></a>
</p>

  

# Nest Js (11) + Typescript + Prisma ORM (7v)

  

Esta plantilla cuenta con las tecnologias descritas para poder iniciar con un desarrollo rapido.

## Engines

#### Arquitectura hexagonal

#### Drive Domain Desing

## Configuración del inicial de la plantilla backend

  

### Requisitos

  

- Node versión >= 18.0.0

- npm versión >= 9.0.0

  

### Instalación

  

1 - Clonar el repositorio.

  

```

git clone https://github.com/DevAngelCrow/backend_template_nest.git

cd backend_template_nest

```

  

2 - Configurar el .env

  

```

cp .env.example .env.local

```

  

Configura las variables de entorno del archivo .env.local de acuerdo a tu necesidad.

  

3 - Procedemos a instalar dependencias, ejecutamos en consola dentro del directorio del repositorio el comando siguiente

  

```

npm install

```

  

4 - Dar permisos de superusuario a la carpeta husky si estas utilizando Linux

  

```

sudo chmod +x .husky/*

```

  

5 - Puede utilizar los siguientes scripts para iniciar el servidor según el modo de su convención:

###### development

```

npm run start

```

###### watch mode

```

npm run start:dev

```

###### production mode

```

npm run start:dev

```

# Estructura general del directorio de carpetas y archivos del proyecto

  

```
📦 backend_template_nest
├── 📁 prisma
|		├── 📁 migrations
|		├── 📁 seeds
|		└── 📄 schema.prisma
├── 📁 src
│ 	├── 📦 modules
│ 	│ 	└── 📁 module
│ 	│ 		├── 📁 domain
│ 	│ 		│ 	 ├── 📁 entities
│ 	│ 		│ 	 ├── 📁 repositories
│ 	│ 		│ 	 ├── 📁 value-objects
│ 	│ 		│ 	 ├── 📁 ports
│ 	│ 		│ 	 ├── 📁 enums
│ 	│ 		│ 	 └── 📁 aggregates
│ 	│ 		├── 📁 application
│ 	│ 		│ 	 ├── 📁 dtos
| 	| 		| 	 ├── 📁 queries-repositories
| 	| 		| 	 ├── 📁 use-cases
| 	| 		| 	 └── 📁 services
│ 	│ 		└── 📁 infrastructure
| 	| 		|	 ├── 📁 config
| 	| 		|	 ├── 📁 controllers
| 	| 		|	 ├── 📁 decorators
| 	| 		|	 ├── 📁 dtos
| 	| 		|	 | 	├── 📁 http
| 	| 		|	 | 	└── 📁 validators
| 	| 		|	 ├── 📁 guards
| 	| 		|	 ├── 📁 implementation
| 	| 		|	 ├── 📁 services
| 	| 		|	 └── 📁 strategies
│ 	│		└── 📄 name.module.ts
│ 	├── 📦 shared
|	|		├── 📁 domain
|	|		|		├── 📁 exceptions
|	|		|		├── 📁 repositories
|	|		|		├── 📁 validator
|	|		|		└── 📁 value-object
|	|		├── 📁 application
|	|		|		├── 📁 dtos
|	|		|		└── 📁 exceptions
│	|		└───📁 infrastructure
|	|				├── 📁 dtos
|	|				├── 📁 config
|	|				├── 📁 decorators
|	|				├── 📁 exceptions
|	|				├── 📁 factories
|	|				├── 📁 http
|	|				├── 📁 interceptors
|	|				├── 📁 middlewares
|	|				├── 📁 persistence
|	|				└── 📁 services
│	|
│	└── 📄 app.module.ts
│
├── 📁 storage
├── 📁 test
├── 📄 .env.example
├── 📄 	docker-compose.yml
├── 📄 	eslint.config.ts
├── 📄 .gitignore
├── 📄 .prettierrc.json
├── 📄 .commitlint.config.ts
├── 📄 	package.json
├── 📄 	prisma.config.ts
├── 📄 README.md
├── 📄 tsconfig.build.json
└── 📄 tsconfig.json

```

  

# Descripcion de carpetas y archivos de los directorios.

  

## Carpeta prisma

  

- 📂 prisma/schema.prisma/: Contiene la configuración del schema de los modelos de la base de datos que utilizará el orm para poder mapear sus acciones de lectura y escritura de la base de datos.

- 📂 prisma/migrations/: Contiene los archivos para migración de la base de datos.

- 📂 prisma/seeds/: Contiene los archivos definidos para poblar la base de datos como cargas iniciales.

## Carpeta src

  
### Modules
- 📂 src/modules: Contiene los módulos que definen integran la funciones especificas que realizará la aplicación.
#### module
- 📂 src/modules/module: El modulo sera una de las piezas en las estara compuesta por tres capas siguiendo los linieamientos de la arquitectura hexagonal (dominio, aplicación e infrastructura).
- ##### 📂 Domain
  - 📂 src/modules/module/domain: La capa de dominio contendrá las reglas de negocio de la aplicación
    - ##### 📂 entities
	    -  src/modules/module/domain/entities: Define las entidades que corresponden al módulo.
	 - ##### 📂 repositories
		 - src/modules/module/domain/repositories: Define las interfaces (clases abstractas) las cuales abstraen la lógica de negocio del módulo. 
	- ##### 📂 value-objects
		 - src/modules/module/domain/value-objects: Define los valores inmutables que tendran las propiedades de las entidades.
	- ##### 📂 ports
		 - src/modules/module/domain/ports: Define los puertos de lógica individual adicional a la lógica de negocio.
	- ##### 📂 aggregates
		 - src/modules/module/domain/aggregates: Define igualmente lógica de negocio que combina entidades como conjunto. 
- ##### 📂 Application
  - 📂 src/modules/module/application: La capa de aplicación contendrá, definirá y orquestará las acciones de la aplicación coordinando el dominio con el mundo exterior.
	  - ##### 📂 dtos
		 - src/modules/module/application/dtos: Define la estructura de objetos homologados de acuerdo a la entidad del dominio o similitud (según sea la necesidad) pero de valores para trasferencia de datos entre capas.
	  - ##### 📂 queries-repositories
		 - src/modules/module/application/queries-repositories: Define la clases abstractas (contratos) especializados para crear consultas especificas o complejas.
	  - ##### 📂 use-cases
		 - src/modules/module/application/use-cases: Define y orquesta las acciones definidas en los repositorios de la capa de dominio del modulo de manera coordinada.
	 - ##### 📂 services
		 - src/modules/module/application/services: Orquesta la lógica que comparte casos de usos entre módulos para el correcto desacoplamiento entre estos. 
- ##### 📂 Infrastructure
  - 📂 src/modules/module/infrastructure: La capa de infraestructura contendrá, e implementará los contratos definidos en los repositorios y puertos, todos los elementos de implementación serán conocidos como los adaptadores del mundo exterior.
	   - ##### 📂 config
		 - src/modules/module/infrastructure/config: Define los contenedores de casos de usos, servicios y repositorios a utilizar para registrarlos en el contenedor de inyección de dependencias que maneja nest js.
	    - ##### 📂 decorators
			- src/modules/module/infrastructure/decorators: Define los decoradores que el módulo posee, estos pueden ser reutilizados en otros módulos como adaptadores del mundo exterior.
		 - ##### 📂 controllers
			- src/modules/module/infrastructure/controllers: Define los controlladores del módulo que interactuan con el cliente.
### Shared
- 📂 src/shared/: Contiene y define valores globales y generales que pueden ser reutilizables en los diferentes módulos que contendrá la aplicación, igualmente sigue los lineamientos de la arquitectura hexagonal.
### App.module.ts
- 📂 src/app.module.ts: Este archivo corresponde e implementa el contenedor de inyección de depencias con el cual trabaja el framework de nest.
- 📂 router/: Define las rutas de la aplicacion con la tecnologia de Vue Router.
### main.ts
src/main.ts: Este archivo corresponde al iniciador del servidor de nest el cual inicia posterior a la ejecución del script utilizado para iniciar el servidor. 
##  

- 📂 services/: Contiene las funciones responsables para le ejecucion de peticiones http hacia API's internas o externas.

  

- 📂 store/: Implementa la gestión del estado global con Pinia.

  

- 📂 utils/: Contiene e incluye funciones de uso general, validadores, etc.

  
## Archivos de directorio raiz.
- 📄 App.vue: Componente raíz que define la estructura base de la aplicación.

- 📄 main.ts: Archivo principal que inicializa Vue, configura plugins y monta la aplicacion.

- 📄 env.example: Archivo de ejemplo para definir variables de entorno necesarias para el proyecto.

- 📄 .git.ignore: Archivo el cual contiene las extensiones que se omiten al momento de realizar un commit del repositorio local y externo.

- 📄 index.html: Archivo que es el punto de entrada principal de la aplicacion en tiempo de desarrollo y sirve como plantilla para la generacion del HTML final durante la compilacion.

- 📄 package.json: Archivo que define la configuracion principal del proyecto(nombre, version, scripts, dependencias y configuraciones especificas del ecosistema JS)

- 📄 tsconfig.app.json, tsconfig.json, tsconfig.node.json: Archivos de configuracion de TypeScript el cual define las opciones del compilador global

- vite.config.ts: Archivo que define cómo se comporta Vite durante el desarrollo, build y preview. Es donde puedes extender funcionalidades, configurar plugins, establecer alias de rutas, entre otros.