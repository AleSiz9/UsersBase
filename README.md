Теория из того что используется в этом Репозитории:
        Технологический стек и архитектура проекта:
1. React 18 + Create React App (CRA),
2. React Router v6,
3. React Context API + Custom Hooks,
4. Управление состоянием (State Management),
   4.1 Мемоизация: useMemo, useCallback,
   4.2 Локальное состояние: useState,
6. Оптимизация производительности,
5.1 React.memo для предотвращения лишних рендеров,

           Promise - это объекты в JS предназначенные для отложенных и асинхронных вычеслений.
При создании промиса используется оператор создания объектов new и функция конструктор Promise
Promise использует функцию-испольнитель(executor), а та в свою очередь принимает 2 параметра (resolve, reject)
(resolve, reject) это ключевые функции-колбэк, которые, каждая выпoлняет свою роль в обработке Promise
resolve - вызывается когда операция завершилась успешно и вернула результат в виде значения
reject - вызывается когда операция не удалась и возвращает значение, указывающее на причину неудачи
 Простой пример:

        let x = true
        promise = new Promise(function (resolve, reject) {
    if(x){
        resolve('Успешно')
    } else {
        reject('Ошибка...')
    }
        })
        console.log(promise) // Успешно
        // x = false
        // console.log(promise) // Ошибка...

Свойства:
Promise.length - Значение свойства всегда равно 1.
    Методы:
1. Promise.all(iterable)- Ожидает выполнение всех промисов или отклонение любого из них
2. Promise.allSettled(iterable) - Ожидает завершения всех полученных промисов (как исполнения так и отклонения)
3. Promise.reject(reason) - Возвращает промис, отклонённый из-за reason.
4. Promise.resolve(value) - Возвращает промис, исполненный с результатом value.

        fetch API - это метод для выполнения HTTP-запросов в браузере. Принимает один обязательный аргумент - путь к данным. 
Он возвращает Promise, который разрешается в Response независимо от того был ли запрос удачным. Для это есть различные способы обработки ответа.
    Например: 
        - Проверка response.ok:
        
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        return response.json();
        })
        .then...

        - C async/await:
        async function name (){
            try{
                await fetch()
            } catch (error){

            }
        }

