import Group, { GroupAttributes } from "../models/group.model";

class GroupRepository {
  async findById(id: number): Promise<Group | null> {
    return Group.findByPk(id);
  }

  async create(group: GroupAttributes): Promise<Group> {
    return Group.create(group);
  }

  async update(id: number, group: GroupAttributes): Promise<number> {
    const [affectedCount] = await Group.update(group, {
      where: { id },
    });
    return affectedCount;
  }

  async delete(id: number): Promise<number> {
    const affectedCount = await Group.destroy({
      where: { id },
    });
    return affectedCount;
  }
}

export default new GroupRepository();
