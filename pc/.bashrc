# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
export HISTCONTROL=ignoredups

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
#case "$TERM" in
#xterm-color)
#    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
#    ;;
#*)
#    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
#    ;;
#esac

# Comment in the above and uncomment this below for a color prompt
#PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

GREEN='\[\033[1;32m\]'
BLUE='\[\033[1;34m\]'
RESET='\[\033[00m\]'
PS1="${BLUE}\t ${GREEN}\w${RESET}\$ "

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD/$HOME/~}\007"'
    ;;
*)
    ;;
esac

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

# if [ -f ~/.bashrc_aliases ]; then
#    . ~/.bashrc_aliases
# fi

# enable color support of ls and also add handy aliases
# if [ "$TERM" != "dumb" ]; then
#    eval "`dircolors -b`"
#    alias ls='ls --color=auto'
#    alias dir='ls --color=auto --format=vertical'
#    alias vdir='ls --color=auto --format=long'
# fi

alias acs="apt-cache search"
alias agu="sudo apt-get update"
alias agg="sudo apt-get upgrade -y"
alias agd="sudo apt-get dist-upgrade"
alias agi="sudo apt-get install -y"
alias agr="sudo apt-get remove"
alias agc="sudo apt-get clean"
alias aga="sudo apt-get autoremove"
alias aptsrc="sudo gedit /etc/apt/sources.list"
alias repos="sudo gedit /etc/apt/sources.list"
alias gedit="sudo gedit"

alias ls='ls -AgGoh --color=auto --file-type'
alias dir='ls -AgGoh --color=auto --file-type'

alias rm="rm -i" #better safe than sorry
alias mv="mv -i"
alias cp="cp -i"
alias vi="vim"
alias du="du -h"
alias df="df -kh"
alias un="tar -zxvf"
alias ping="ping -c 10"

# alias sd="sudo shutdown -P now"

# typos
alias exot="exit"
alias ..="cd .."
alias ...="cd ..."
alias cd..="cd .."


# some more ls aliases
# alias ll='ls -l'
# alias la='ls -A'
# alias l='ls -CF'

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi


# This line was appended by KDE
# Make sure our customised gtkrc file is loaded.
export GTK2_RC_FILES=$HOME/.gtkrc-2.0
