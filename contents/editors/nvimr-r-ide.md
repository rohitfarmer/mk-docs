---
comments: true
---

# How to use Neovim or VIM Editor as an IDE for R
Note: This tutorial is written for Linux based systems. 

<a href="https://raw.githubusercontent.com/jalvesaq/Nvim-R/master/doc/Nvim-R.txt" target="_blank">Nvim-R official documentation</a>

## Requirements

### R >= 3.0.0
To install the latest version of R please flollow the download and install instructions at [https://cloud.r-project.org/](https://cloud.r-project.org/)

### Neovim >= 0.2.0
[Neovim](https://neovim.io/) (nvim) is the continuation and extension of Vim editor with the aim to keep the good parts of Vim and add more features. In this tutorial I will be using Neovim (nvim), however, most of the steps are equally applicable to Vim also. Please follow download and installation instructions on nvim's GitHub wiki [https://github.com/neovim/neovim/wiki/Installing-Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim).

**OR**  

### Vim >= 8.1
[Vim](https://github.com/vim/vim) usually comes installed in most of the Linux based operating system. However, it may not be the latest one. Therefore, to install the latest version please download and install it from Vim's GitHub repository as mentioned below or a method that is more confortable to you.

```
git clone https://github.com/vim/vim.git
make -C vim/
sudo make install -C vim/
```

### Plugin Manager
There are more than one plugin manager's available for Vim that can be used to install the required plugins. In this tutorial I will be using [vim-plug](https://github.com/junegunn/vim-plug) pluggin manager. 

### Plugins
In the end below are the plugins that we would need to convert Vim editor into a fully functional IDE for R. 

1. Nvim-R: [https://github.com/jalvesaq/Nvim-R](https://github.com/jalvesaq/Nvim-R) 
   * Nvim-R is the main plugin that will add the functionality to execute R code from within the Vim editor.
1. Ncm-R: [https://github.com/gaalcaras/ncm-R](https://github.com/gaalcaras/ncm-R)
   * Ncm-R adds synchronous auto completion features for R.
   * It is based on [ncm2](https://github.com/ncm2/ncm2) and [nvim-yarp](https://github.com/roxma/nvim-yarp) plugins. 
1. Nerd Tree: [https://github.com/preservim/nerdtree](https://github.com/preservim/nerdtree)
   * Nerd Tree will be used to toggle file explorer in the side panel.
1. DelimitMate: [https://github.com/Raimondi/delimitMate](https://github.com/Raimondi/delimitMate)
   * This plug-in provides automatic closing of quotes, parenthesis, brackets, etc.
1. Vim-monokai-tasty: [https://github.com/patstockwell/vim-monokai-tasty](https://github.com/patstockwell/vim-monokai-tasty)
   * Monokai color scheme inspired by Sublime Text's interpretation of monokai.
1. Lightline.vim: [https://github.com/itchyny/lightline.vim](https://github.com/itchyny/lightline.vim)
   * Lineline.vim adds asthetic enhancements to Vim's statusline/tabline.

## Procedure

1. Make sure that you have `R >=3.0.0` installed. 
2. Make sure that you have `Neovim >= 0.2.0` installed. 
3. Install the `vim-plug` plugin manager.
```
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

4. Install the required plugins.

First, create an `init.vim` file in `~/.config/nvim` folder (create the folder if it doesn't exist). This file is equivalent to a `.vimrc` file in the traditional Vim environment. To `init.vim` file start adding:

```bash
" Specify a directory for plugins
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')

" List of plugins.
" Make sure you use single quotes

" Shorthand notation
Plug 'jalvesaq/Nvim-R'
Plug 'ncm2/ncm2'
Plug 'roxma/nvim-yarp'
Plug 'gaalcaras/ncm-R'
Plug 'preservim/nerdtree'
Plug 'Raimondi/delimitMate'
Plug 'patstockwell/vim-monokai-tasty'
Plug 'itchyny/lightline.vim'

" Initialize plugin system
call plug#end()
```

5. Update and add more features to the `init.vim` file.

```bash
" Set a Local Leader

" With a map leader it's possible to do extra key combinations
" like <leader>w saves the current file
let mapleader = ","
let g:mapleader = ","


" Plugin Related Settings

" NCM2
autocmd BufEnter * call ncm2#enable_for_buffer()    " To enable ncm2 for all buffers.
set completeopt=noinsert,menuone,noselect           " :help Ncm2PopupOpen for more
                                                    " information.

" NERD Tree
map <leader>nn :NERDTreeToggle<CR>                  " Toggle NERD tree.

" Monokai-tasty
let g:vim_monokai_tasty_italic = 1                  " Allow italics.
colorscheme vim-monokai-tasty                       " Enable monokai theme.

" LightLine.vim 
set laststatus=2              " To tell Vim we want to see the statusline.
let g:lightline = {
   \ 'colorscheme':'monokai_tasty',
   \ }


" General NVIM/VIM Settings

" Mouse Integration
set mouse=i                   " Enable mouse support in insert mode.

" Tabs & Navigation
map <leader>nt :tabnew<cr>    " To create a new tab.
map <leader>to :tabonly<cr>     " To close all other tabs (show only the current tab).
map <leader>tc :tabclose<cr>    " To close the current tab.
map <leader>tm :tabmove<cr>     " To move the current tab to next position.
map <leader>tn :tabn<cr>        " To swtich to next tab.
map <leader>tp :tabp<cr>        " To switch to previous tab.


" Line Numbers & Indentation
set backspace=indent,eol,start  " To make backscape work in all conditions.
set ma                          " To set mark a at current cursor location.
set number                      " To switch the line numbers on.
set expandtab                   " To enter spaces when tab is pressed.
set smarttab                    " To use smart tabs.
set autoindent                  " To copy indentation from current line 
                                " when starting a new line.
set si                          " To switch on smart indentation.


" Search
set ignorecase                  " To ignore case when searching.
set smartcase                   " When searching try to be smart about cases.
set hlsearch                    " To highlight search results.
set incsearch                   " To make search act like search in modern browsers.
set magic                       " For regular expressions turn magic on.


" Brackets
set showmatch                   " To show matching brackets when text indicator 
                                " is over them.
set mat=2                       " How many tenths of a second to blink 
                                " when matching brackets.


" Errors
set noerrorbells                " No annoying sound on errors.


" Color & Fonts
syntax enable                   " Enable syntax highlighting.
set encoding=utf8                " Set utf8 as standard encoding and 
                                 " en_US as the standard language.

" Enable 256 colors palette in Gnome Terminal.
if $COLORTERM == 'gnome-terminal'
    set t_Co=256
endif

try
    colorscheme desert
catch
endtry


" Files & Backup
set nobackup                     " Turn off backup.
set nowb                         " Don't backup before overwriting a file.
set noswapfile                   " Don't create a swap file.
set ffs=unix,dos,mac             " Use Unix as the standard file type.


" Return to last edit position when opening files
au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
```
## Frequently Used Keyboard Shortcuts/Commands
Note: The commands below are according to the `init.vim` settings mentioned in this Gist.

```bash
# Nvim-R
\rf               " Connect to R console.
\rq               " Quit R console.
\ro               " Open object bowser.
\d                " Execute current line of code and move to the next line.
\ss               " Execute a block of selected code.
\aa               " Execute the entire script. This is equivalent to source().
\xx               " Toggle comment in an R script.

# NERDTree
,nn               " Toggle NERDTree.
```

## Example Code

```r
library(tidyverse)
# \rf               " Connect to R console.
# \rq               " Quit R console.
# \ro               " Open object bowser.
# \d \ss \aa        " Execution modes. 
# ?help
# ,nn               " NERDTree.
# ,nt, tp, tn       " Tab navigation.

theme_set(theme_bw())
data("midwest", package = "ggplot2")

gg  <- ggplot(midwest, aes(x=area, y = poptotal)) +
        geom_point(aes(col = state, size = popdensity)) +
        geom_smooth(method = "loess", se = F) +
        xlim(c(0, 0.1)) +
        ylim(c(0, 500000)) +
        labs(subtitle = "Area Vs Population",
             y = "Population",
             x = "Area",
             title = "Scatterplot",
             caption = "Source: midwest")

plot(gg) # Opens an external window with the plot.

midwest$county # To show synchronous auto completion. 

View(midwest) # Opens an external window to display a portion of the tibble.
```

## Add Colour etc. to VIM in a Screen Session (optional)
Add these lines to `~/.screenrc` file.
```bash
# Use 256 colors
attrcolor b ".I"    # allow bold colors - necessary for some reason
termcapinfo xterm 'Co#256:AB=\E[48;5;%dm:AF=\E[38;5;%dm'   # tell screen how to set colors. AB = background, AF=foreground
defbce on    # use current bg color for erased chars]]'

# Informative statusbar
hardstatus off
hardstatus alwayslastline
hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %m-%d %{W} %c %{g}]'

# Use X scrolling mechanism
termcapinfo xterm* ti@:te@

# Fix for residual editor text
altscreen on
```