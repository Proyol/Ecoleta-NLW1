## INSCLUIR REACTJS NO PROJETO

`npx create-react-app "nome" --template=typescript` (Iniciar um projeto básico em ReactJS com template para typescript)



# COMPONENTES

Exemplo da criação de um componente:

```typescript
import React from 'react';

function Header(){
    return (
        <header>
            <h1>TEXT</h1>
        </header>
    )
}

export default Header;
```

Aplicando no *App.tsx*:

```typescript
import React from 'react';
import './App.css';

import Header from './Header';

function App() {
  return (
    <div>
      <Header />
      <h1>CONTEUDO</h1>
    </div>
  );
}

export default App;

```



# PROPRIEDADES  DE UM COMPONENTE

```typescript
import React from 'react';

//Definir tipagem de um objeto
//? para que a propriedade não seja obrigatória
interface HeaderProps{
    title: String;
}

const Header: React.FC<HeaderProps> = (props) =>{
    return (
        <header>
            <h1>{props.title}</h1>  
        </header>
    )
}

export default Header;
```

Aplicando no *App.tsx*:

```typescript
import React from 'react';
import './App.css';

import Header from './Header';

function App() {
  return (
    <div>
      <Header title="jojo"/>

      <h1>CONTEUDO</h1>
    </div>
  );
}

export default App;

```



# ESTADOS

Informações mantidas pelo próprio componente. Muito usado para atualizar o valor de variáveis em componentes do React.

```typescript
import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0); 
  //counter é valor da variável armazenada
  //setCounter é uma função para atualizar o valor do counter
  //useState(0) seta o valor inicial do counter para 0

  function handleButtonClick(){
    setCounter(counter + 1);
  }

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>Aumenter</button>
      <h1>{counter}</h1>
    </div>
  );
}

export default App;
```



# ÍCONES NO REACT

`npm install react-icons`

```typescript
import {'icone(s) para importar'} from 'react-icons';
```



# BIBLIOTECA PARA ROTEAMENTO

```
npm install react-router-dom
npm install @types/react-router-dom -D
```

```typescript
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

//importar as páginas
import Home from './pages/Home'
import CreatePoints from './pages/Create Point'

const Routes = () =>{
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/> //entrar na rota localhost:3000
            <Route component={CreatePoint} path="/create-point"/>
        </BrowserRouter>
    );
}

export default Routes;
```



# SPA (SINGLE PAGE APPLICATIONS)

Evita o carregamento da aplicação novamente ao mudarmos de rota

```typescript
import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <Link to="/create-point"> //O link tem a mesma função que o 'a' mas é usado para SPA
        	<span>
				<FiLogIn />
					<strong>
						Cadastre um ponto de coleta
					</strong>
		</Link>
    );
}

export default Home
```



# FAZER REQUISIÇÕES NO BACKEND

`npm install axios`

```typescript
import axios from 'axios';
```

