type User = {
    name: string;
    age: number;
};

function isAdult(user: User): boolean {
    return user.age >= 18;
}

const justine: User = {
    name: 'Justine',
    age: 44
};

const isJustineAnAdult = isAdult(justine);

console.log("... result ", isJustineAnAdult, justine.age);
