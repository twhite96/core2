import errors from '../errors'
import Option from './Option'

import * as T from './types'
import * as Filter from '../filter/types'

export default class Command implements T.Command {
  private _description: string
  private _options: Option[] = []

  public description(description?: string): string | Command {
    if (typeof description === 'undefined') {
      switch (true) {
        case this._description === undefined:
          throw errors.error.ERR_PROGRAM_DESCRIPTION_UNDEFINED
      }

      return this._description
    }

    switch (true) {
      case typeof description !== 'string':
        throw errors.error.ERR_PROGRAM_DESCRIPTION_VALIDATION_TYPE

      case description.length === 0:
        throw errors.error.ERR_PROGRAM_DESCRIPTION_VALIDATION_LENGTH
    }

    this._description = description

    return this
  }

  public option(
    slug: string,
    description: string,
    filter?: Filter.Is | T.OptionFilter<T.OptionFilterOutput>,
  ) {
    this._options.push(new Option(slug, description, filter))

    return this
  }
}