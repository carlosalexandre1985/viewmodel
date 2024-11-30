class StubBuilder {
    _persistent: boolean = false
    _stubClass: any

    constructor(_stubClass: any) {
        this._stubClass = _stubClass

        return this
    }

    persistent() {
        this._persistent = true

        return this
    }

    build() {
        if (!this._stubClass) {
            throw new Error('You should inform the Stub Class')
        }

        return new this._stubClass(this._persistent)
    }
}

export default StubBuilder