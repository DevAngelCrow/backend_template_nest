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
|	├── 📁 migrations
|	├── 📁 seeds
|	└── 📄 schema.prisma
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
| 	| 		|	 | 	  ├── 📁 http
| 	| 		|	 | 	  └── 📁 validators
| 	| 		|	 ├── 📁 guards
| 	| 		|	 ├── 📁 implementation
| 	| 		|	 ├── 📁 services
| 	| 		|	 └── 📁 strategies
│ 	│		└── 📄 name.module.ts
│ 	├── 📦 shared
|	|		├── 📁 domain
|	|		|	 ├── 📁 exceptions
|	|		|	 ├── 📁 repositories
|	|		|	 ├── 📁 validator
|	|		|	 └── 📁 value-object
|	|		├── 📁 application
|	|		|	 ├── 📁 dtos
|	|		|	 └── 📁 exceptions
│	|		└───📁 infrastructure
|	|			 ├── 📁 dtos
|	|			 ├── 📁 config
|	|			 ├── 📁 decorators
|	|			 ├── 📁 exceptions
|	|			 ├── 📁 factories
|	|			 ├── 📁 http
|	|			 |	  ├── 📁 dtos
|	|			 |	  ├── 📁 filters
|	|			 |	  └── 📁 mappers
|	|			 ├── 📁 interceptors
|	|			 ├── 📁 middlewares
|	|			 ├── 📁 persistence
|	|			 └── 📁 services
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
			- src/modules/module/infrastructure/controllers: Define los controlladores que orquestan los casos de uso del módulo que interactuan con el cliente.
		 - ##### 📂 dtos
			- src/modules/module/infrastructure/dtos: Define los object para transferencia de datos entre capa y los validadores de las peticiones http que el cliente realiza al momento del consumo de enpoints.
		  - ##### 📂 guards
			- src/modules/module/infrastructure/guards: Define los componentes que deciden si una solicitud puede continuar o no, ejecutándose antes del controlador.
		  - ##### 📂 strategies
			- src/modules/module/infrastructure/strategies: Define las clases que establecen cómo se autentica un usuario, encapsulando la lógica para validar credenciales (JWT, local, OAuth, etc.), generalmente se integran con los guards de autenticación.
		 - ##### 📂 implementation
			- src/modules/module/infrastructure/implementation: Define la implementación de los repositorios y puertos definidos en el dominio, aca utilizan las tecnologias del mundo exterior, por lo tanto la implementación sera el adaptador primario.
		 - ##### 📂 services
			- src/modules/module/infrastructure/servicios: Define los servicios de infraestructura que envuelven tecnologias del mundo exterior sin requerir de contratos definidos en el dominio.
### Shared
- 📂 src/shared/: Contiene y define valores globales y generales que pueden ser reutilizables en los diferentes módulos que contendrá la aplicación, igualmente sigue los lineamientos de la arquitectura hexagonal.
- ##### 📂 Domain
  - 📂 src/shared/domain: La capa de dominio contendrá las reglas de negocio compartidas de la aplicación
    - ##### 📂 exceptions
	    -  src/shared/domain/exceptions: Define el tipo de excepciones globales a reutilizar en los diferentes módulos de la aplicación.
	 - ##### 📂 repositories
	    -  src/shared/domain/repositories: Define los repositorios globales.
	 - ##### 📂 validator
	    -  src/shared/domain/validator: Define validadores globales reutilizables para los value-objects de cada modulo de la aplicación.
	  - ##### 📂 value-objects
	    -  src/shared/domain/exceptions: Define value-objects globales reutilizables en los módulos de la aplicación.
- ##### 📂 Application
  - 📂 src/shared/domain: La capa de aplicación contendrá, definirá y orquestará las acciones de la aplicación coordinando el dominio compartido con el mundo exterior.
    - ##### 📂 exceptions
	    -  src/shared/application/exceptions: Define el tipo de excepciones globales a reutilizar en los diferentes módulos de la aplicación.
	 - ##### 📂 dtos
	    -  src/shared/domain/exceptions: Define los dto generales a reutilizar en los módulos de la aplicación.
- ##### 📂 Infraestructure
  - 📂 src/shared/infrastructure: La capa de aplicación contendrá, definirá y orquestará las acciones de la aplicación coordinando el dominio compartido con el mundo exterior.
    - ##### 📂 exceptions
	    -  src/shared/infrastructure/exceptions: Define el tipo de excepciones globales a reutilizar en los diferentes módulos de la aplicación.
	- ##### 📂 decorators
	    -  src/shared/infrastructure/decorators: Define los decoradores que el módulo posee, estos pueden ser reutilizados en otros módulos como adaptadores del mundo exterior.
	 - ##### 📂 factories
	    -  src/shared/infrastructure/factories: Define elementos encargados de generar/crear instancias de objetos a utilizar.
	  - ##### 📂 http
	    -  src/shared/infrastructure/factories: Define elementos encargados de generar/crear instancias de objetos a utilizar.
			  - ##### 📂 dtos
				   -  src/shared/infrastructure/http/dtos: Define objetos para las respuestas que el cliente recibirá en formato JSON.
			  - ##### 📂 filters
				   -  src/shared/infrastructure/http/filters: Encargados de adaptar/limpiar las entradas y salidas del sistema.
			  - ##### 📂 mappers
				   -  src/shared/infrastructure/http/mappers: Encargados de convertir datos de modelos de distintas capas.
	- ##### 📂 interceptors
	    -  src/shared/infrastructure/interceptors: Define las envolturas que envuelven y controlan la ejecución de acciones transversales tales como los casos de uso y el uso de transacciones por ejemplo las del ORM que manipula la base de datos.
	 - ##### 📂 persistence
	    -  src/shared/infrastructure/persistence: Adaptador para la interaccion con la base de datos del sistema.
### App.module.ts
- 📂 src/app.module.ts: Este archivo corresponde e implementa el contenedor de inyección de depencias con el cual trabaja el framework de nest.
- 📂 router/: Define las rutas de la aplicacion con la tecnologia de Vue Router.
### main.ts
src/main.ts: Este archivo corresponde al iniciador del servidor de nest el cual inicia posterior a la ejecución del script utilizado para iniciar el servidor. 
  
## Archivos de directorio raiz.
- 📄 env.example: Archivo de ejemplo para definir variables de entorno necesarias para el proyecto.

- 📄 .git.ignore: Archivo el cual contiene las extensiones que se omiten al momento de realizar un commit del repositorio local y externo.

- 📄 package.json: Archivo que define la configuracion principal del proyecto(nombre, version, scripts, dependencias y configuraciones especificas del ecosistema JS).

- 📄 tsconfig.json: Archivos de configuracion de TypeScript el cual define las opciones del compilador global.

- 📄 .prettierrc: Archivo de configuración para el formateo del estilo consistente del codigo.
- 📄 docker-compose.yml: Archivo que define y orquesta varios contenedores Docker como un solo sistema.
- 📄 eslint.config.mjs: Archivo de configuración que define las reglas y permite la deteccion de errores del formato del codigo.
- 📄 nest-cli.json: Archivo de configuración de la CLI de Nest.
- 📄 prisma.config.json: Archivo de configuración de prisma.