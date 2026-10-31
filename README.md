# Reels Motion Design: Cortes na Educação em 2027

Projeto em Motion Design 2D/2.5D no estilo **Explainer Editorial** (inspirado na identidade visual da Vox e Kurzgesagt), criado para o perfil da **[@profcarli](https://github.com/nalrom)** no Instagram.

## 📐 Especificações Técnicas
- **Formato**: Vertical 9:16 (1080 x 1920 px)
- **Taxa de Quadros**: 60 FPS
- **Duração Total**: 40 segundos (2.400 frames)
- **Zona Segura (Safe Zone)**: Superior (250px livres) e Inferior (420px livres) respeitados para a interface do Instagram Reels.
- **Paleta de Cores**:
  - Azul-marinho profundo: `#0F172A`
  - Cinza-gelo: `#F8FAFC`
  - Vermelho-alerta: `#EF4444` (cortes e perdas)
  - Amarelo-ouro: `#F59E0B` (destaques e números)
  - Verde-água: `#10B981` (piso no papel)

---

## 🎬 Roteiro de Cenas Implementado

1. **Cena 1: O Gancho (00:00 – 00:05 | frames 0 a 300)**
   - Livro gigante em vetor 2D do Orçamento.
   - Tesoura estilo colagem corta o livro ao meio na diagonal.
   - Moedas saltam da fenda com física de queda e gravidade.
   - Palavra **"CORTES"** dividida com o movimento da lâmina.
   - Zoom-in em match-cut para a próxima cena.

2. **Cena 2: A Ilusão do Piso vs. Realidade (00:05 – 00:12 | frames 300 a 720)**
   - Split-screen horizontal.
   - Topo: Odômetro atinge R$ 141,2 Bilhões com gráfico em barras subindo.
   - Base: Lupa analisa o chão escolar revelando corrosão pela inflação.
   - A base expande e empurra o topo para fora, focando na carteira escolar encolhendo.

3. **Cena 3: O Golpe na Ciência – CAPES (00:12 – 00:20 | frames 720 a 1200)**
   - Capelo e microscópio em traço minimalista branco.
   - Grade de 36 estudantes/pesquisadores: guilhotina vermelha desce e apaga 50% deles.
   - Bloco de impacto com **-R$ 424,6 Milhões** cai do topo com efeito screen-shake.
   - Contador regressivo cravando **-181 MIL BOLSAS**.

4. **Cena 4: Educação Básica nos Municípios (00:20 – 00:30 | frames 1200 a 1800)**
   - Carrossel horizontal dinâmico de 3 quadros em estrada contínua:
     - 🚌 Ônibus escolar com estrada inclinando em descida íngreme de **-17%**.
     - 🏫 Escola (PDDE) encolhendo **-9%** com moeda caindo pelo teto.
     - 🥗 Prato de merenda (PNAE) perdendo fatia de pizza de **-6%**.

5. **Cena 5: O Efeito Dominó no Congresso & CTA (00:30 – 00:40 | frames 1800 a 2400)**
   - Silhueta do Congresso Nacional brasileiro na base.
   - Balança de dois pratos: bloco pesado de Emendas Parlamentares (R$ 44,8 Bi) tomba a balança e catapulta os blocos da educação para o alto.
   - Card interativo com a foto da **Profª Carli (@profcarli)** e botões de Comente, Compartilhe e Salve.
   - Transição suave em loop com a textura inicial.

---

## 🚀 Renderização Automática no GitHub Actions
Cada push na branch `main` executa automaticamente o workflow no GitHub Actions e renderiza o arquivo **`reels-educacao-2027.mp4`** em 1080x1920 a 60fps na nuvem do GitHub, disponibilizando o download direto em **Actions > Artifacts**.
